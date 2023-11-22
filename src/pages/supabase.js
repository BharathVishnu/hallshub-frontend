import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

import React from 'react';

const SupabasePage = () => {
  // Your page content here
  return (
    <div>
      {/* Page content */}
    </div>
  );
};
export default SupabasePage;