// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient } from '@supabase/supabase-js';
const supabasekey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxcXpwa2F5aXZmZXJ6enpuc3JuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAxNTQ4NzAsImV4cCI6MjAxNTczMDg3MH0.dmhOCOt-RU9f1FnxFvcRDDwz6wY7xm5KdZggNc81mNY";

const supabase = createClient('https://hqqzpkayivferzzznsrn.supabase.co', supabasekey);

//const express = require('supabase');
//const app = express();
//app.get('/', ()=>{
     //supabase.from('tablename').
//})

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' });
}
