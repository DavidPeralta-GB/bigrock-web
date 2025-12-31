// app/api/revalidate/route.ts
import { revalidatePath, revalidateTag } from 'next/cache';
import { parseBody } from 'next-sanity/webhook';

export async function POST(request: Request) {
  try {
    const { isValidSignature, body } = await parseBody(
      request,
      process.env.SANITY_WEBHOOK_SECRET
    );

    if (!isValidSignature) {
      return Response.json({ message: 'Invalid signature' }, { status: 401 });
    }

    // Revalidate everything for simplicity — you can make this more targeted later
    revalidatePath('/', 'layout');

    return Response.json({ 
      revalidated: true, 
      now: Date.now(),
      body 
    });
  } catch (err) {
    console.error('Revalidation error:', err);
    return Response.json({ message: 'Error revalidating' }, { status: 500 });
  }
}