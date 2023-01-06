import multer from 'multer';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      const { teamId } = req.context.user;
      const dir = `./uploads/shm/${teamId}`;

      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      return cb(null, dir);
    } catch (error) {
      return cb(
        new Error('Error While Determining the Destination file of Pictures'),
        ''
      );
    }
  },

  filename: (req, file, cb) => {
    if (file) {
      const { teamId } = req.context.user;
      const fileName = `./uploads/shm/${teamId}/${
        file.originalname
      }-${Date.now()}`;
      if (fs.existsSync(fileName))
        cb(new Error(`file already exists: ${fileName}`), '');
      else cb(null, `${file.originalname}`);
    } else cb(new Error('Error While determinig fileName '), '');
  },
});

export default multer({ storage: storage });
