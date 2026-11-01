import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405);
    }

    const body = await req.json().catch(() => null);
    const password = typeof body?.password === "string" ? body.password : "";
    const action = body?.action;

    if (!password) {
      return jsonResponse({ error: "Invalid credentials" }, 401);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: isValid, error: authError } = await supabase.rpc("verify_admin_password", {
      p_password: password,
    });
    if (authError) throw authError;
    if (isValid !== true) {
      return jsonResponse({ error: "Invalid credentials" }, 401);
    }

    if (action === "list") {
      const { data, error } = await supabase
        .from("patient_feedback")
        .select("id, patient_name, phone, rating, feedback_text, is_resolved, resolved_at, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return jsonResponse({ feedback: data ?? [] });
    }

    if (action === "resolve") {
      const id = typeof body?.id === "string" ? body.id : "";
      if (!UUID_PATTERN.test(id)) {
        return jsonResponse({ error: "Invalid feedback id" }, 400);
      }
      const { error } = await supabase
        .from("patient_feedback")
        .update({ is_resolved: true, resolved_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
      return jsonResponse({ ok: true });
    }

    return jsonResponse({ error: "Unknown action" }, 400);
  } catch (err) {
    console.error("admin-feedback failed", err);
    return jsonResponse({ error: "Something went wrong. Please try again." }, 500);
  }
});
