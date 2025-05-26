import { Compliment } from './types';

export async function generateCompliments(target: string, scenario: string = '未指定'): Promise<Compliment[]> {
  try {
    const response = await fetch('/api/compliments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ target, scenario }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate compliments');
    }

    const data = await response.json();
    return data.compliments;
  } catch (error) {
    console.error('Error generating compliments:', error);
    throw new Error('Failed to generate compliments');
  }
}