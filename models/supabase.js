const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadMedia(file, folder, path) {
    try{
        const { data, error } = await supabase.storage
            .from(folder)
            .upload(path, file);
        
            return { error };
    }catch (error) {
        return { error }
    }
}

module.exports = {
    uploadMedia
}