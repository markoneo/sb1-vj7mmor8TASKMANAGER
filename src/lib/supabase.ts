import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = 'https://nxcuwbnmtvpnueowbahc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54Y3V3Ym5tdHZwbnVlb3diYWhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0Njg3NjksImV4cCI6MjA1MDA0NDc2OX0.DyLrxuZ-rR0lvcQM79S0F4hPupqIVoqkIVU-7Tb1zWQ';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);