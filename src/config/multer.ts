import { extname } from 'path';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const reviewMulterConfig: MulterOptions = {
  fileFilter: (req, file, cb) => {
    const extension = extname(file.originalname);

    if (extension !== '.mp3') {
      return cb(new Error('Invalid file type'), false);
    }

    cb(null, true);
  },

  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const id: string = uuid();

      const extension = extname(file.originalname);

      cb(null, `${id}${extension}`);
    },
  }),
};
