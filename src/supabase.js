import { createClient } from "@supabase/supabase-js"
import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = process.env.supabaseUrl
const supabaseKey = process.env.supabaseKey
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase