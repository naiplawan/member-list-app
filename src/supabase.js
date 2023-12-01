import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://hkgnzkkdqwwsvccbideu.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrZ256a2tkcXd3c3ZjY2JpZGV1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDExNzU0MDMsImV4cCI6MjAxNjc1MTQwM30.OobGzJVeAqfRNP59kwd9B29m3TRBmLT3kdcQ29edyHc"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase