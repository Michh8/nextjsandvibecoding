import { techniques } from '@/lib/techniques';
export function GET(){return Response.json({data:techniques},{headers:{'Cache-Control':'public, max-age=3600'}})}
