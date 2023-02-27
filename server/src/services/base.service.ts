import { unlinkSync, readFileSync } from 'fs';

const pagination = (total: number, limit: number): number => {
  return Math.ceil(total / limit);
};

const removeFile = (filename: string) => {
  try {
    if (filename.split('/')[0] !== 'files') filename = `files/${filename}`;
    unlinkSync(`./public/${filename}`);
    console.log(`successfully deleted /public/${filename}`);
  } catch (err: any) {
    console.log(err.message);
  }
};

const base64_encode = (file?: string) => {
  // read binary data
  if (!file) return '';
  const bitmap = readFileSync(file);
  // convert binary data to base64 encoded string
  return `data:image/png;base64, ${new Buffer(bitmap).toString('base64')}`;
};

export { pagination, removeFile, base64_encode };
