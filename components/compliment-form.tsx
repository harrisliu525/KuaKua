'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ComplimentResults } from '@/components/compliment-results';
import { useToast } from '@/hooks/use-toast';
import { generateCompliments } from '@/lib/api';
import { Compliment, FormValues } from '@/lib/types';
import { saveToLocalStorage, getFromLocalStorage } from '@/lib/storage';
import { HistoryList } from './history-list';
import { ClientOnly } from './client-only';

const formSchema = z.object({
  target: z.string().min(1, { message: '请输入被夸奖的对象' }),
  scenario: z.string().optional(),
});

export function ComplimentForm() {
  const [compliments, setCompliments] = useState<Compliment[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<FormValues[]>([]);
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedHistory = getFromLocalStorage('complimentHistory') || [];
    setHistory(savedHistory);
    setIsHistoryLoaded(true);
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      target: '',
      scenario: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsGenerating(true);
    try {
      const results = await generateCompliments(values.target, values.scenario || '未指定');
      setCompliments(results);
      
      // Save to history
      const newHistory = [values, ...history.slice(0, 9)];
      setHistory(newHistory);
      saveToLocalStorage('complimentHistory', newHistory);
      
    } catch (error) {
      console.error('Error generating compliments:', error);
      toast({
        title: '生成失败',
        description: '抱歉，生成夸奖内容时出错，请稍后重试。',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  }

  const loadHistoryItem = (item: FormValues) => {
    form.setValue('target', item.target);
    form.setValue('scenario', item.scenario || '');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="honey-card mb-8"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="target"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">被夸奖的对象</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="例如：我的同事小王"
                      className="honey-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="scenario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium">场景（可选）</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="例如：项目复盘会、第一次见面..."
                      className="honey-input"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="honey-button w-full"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  正在生成...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  生成夸奖内容
                </>
              )}
            </Button>
          </form>
        </Form>
      </motion.div>

      {history.length > 0 && (
        <ClientOnly>
          <HistoryList history={history} onSelect={loadHistoryItem} />
        </ClientOnly>
      )}

      {compliments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ComplimentResults 
            target={form.getValues().target} 
            scenario={form.getValues().scenario || '未指定'} 
            compliments={compliments} 
          />
        </motion.div>
      )}
    </div>
  );
}