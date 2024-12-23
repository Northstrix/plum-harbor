export interface FileType {
    color: string;
    type: string;
    extensions: string[];
}

export const fileTypeClassification : FileType[] = [
    { color:'#2B579A', type:'Word Processing Document', extensions:['.doc', '.docx', '.docm', '.dot', '.dotx', '.dotm']},
    { color:'#2196F3', type:'Image', extensions:['.jpg', '.jpeg', '.jfif', '.pjpeg', '.pjp', '.png', '.gif', '.bmp', '.tiff', '.tif', '.webp', '.heif', '.heic', '.avif', '.eps']},
    { color:'#227447', type:'Spreadsheet', extensions:['.xls', '.xlsx', '.xlsm', '.xlsb', '.xlt', '.xltx', '.xltm', '.xla', '.xlam', '.xlw']},
    { color:'#A031EB', type:'Archive', extensions:['.zip','.rar','.7z','.tar','.gz','.bz2','.xz','.tar.gz','.tar.bz2','.tar.xz','.arc','.arj','.ace','.cab','.lz','.lzh']},
    { color:'#4332A2', type:'Binary File', extensions:['.bin']},
    { color:'#9525A5', type:'Java File', extensions:['.java','.class','.jar']},
    { color:'#D71064', type:'Presentation File ', extensions:['.ppt','.pptx','.pptm','.pps','.ppsx','.pot','.potx','.potm','.odp']},
    { color:'#D31A35', type:'PDF File ', extensions:['.pdf']},
    { color:'#E7013F', type:'Hypertext/Plaintext/Rich Text File ', extensions:['.html','.htm','.xhtml','.txt','.rtf']},
    { color:'#FEEA00', type:'JavaScript File ', extensions:['.js','.mjs','.cjs','.jsx','.es6','.es']},
    { color:'#FF5613', type:'TypeScript File ', extensions:['.ts','.tsx','.d.ts','.mts','.cts']},
    { color:'#29BF12', type:'Cascading Style Sheets ', extensions:['.css']},
    { color:'#06BE66', type:'Video File ', extensions:['.mp4','.mov','.wmv','.avi','.flv','.f4v','.mkv','.webm','.ogv','.ogg','.3gp','.m4v']},
    { color:'#41C3AA', type:'Audio File ', extensions:['.mp3','.wav','.aiff','.aac','.flac','.ogg','.m4a','.wma','.amr','.ape','.au','.ra','.rm']},
    { color:'#3D4785', type:'Unknown/Other', extensions:['']}
  ];