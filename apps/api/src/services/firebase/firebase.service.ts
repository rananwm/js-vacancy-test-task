import { File } from '@koa/multer';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { AppKoaContext } from 'types';
import firebaseHelper from './firebase.helper';

const uploadPhoto = async (photo: File, ctx: AppKoaContext): Promise<string | null> => {
  const storage = firebaseHelper.firebaseStorage;

  const metadata = {
    contentType: photo.mimetype,
  };

  const storageRef = ref(storage, `images/${photo.originalname}`);
  const uploadTask = uploadBytesResumable(storageRef, photo.buffer, metadata);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      () => {},
      (error) => {
        reject(error.message);

        ctx.assertClientError(true, {
          email: error.message,
        });
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);

        resolve(url);
      },
    );
  });
};

export default Object.assign({}, firebaseHelper, { uploadPhoto });
