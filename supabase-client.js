const NILUS_CONFIG = window.NILUS_CONFIG || {};

const supabaseClient = window.supabase.createClient(
  NILUS_CONFIG.supabaseUrl,
  NILUS_CONFIG.supabasePublishableKey
);

function isSupabaseConfigured() {
  return Boolean(
    NILUS_CONFIG.supabaseUrl &&
    NILUS_CONFIG.supabasePublishableKey &&
    !NILUS_CONFIG.supabaseUrl.includes('YOUR-PROJECT') &&
    !NILUS_CONFIG.supabasePublishableKey.includes('YOUR-PUBLISHABLE-KEY')
  );
}
