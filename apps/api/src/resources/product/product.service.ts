import { Product } from 'app-types';
import _ from 'lodash';
import db from 'db';
import { DATABASE_DOCUMENTS } from 'app-constants';
import { productSchema } from 'schemas';

const productService = db.createService<Product>(DATABASE_DOCUMENTS.PRODUCTS, {
  schemaValidator: (obj) => productSchema.parseAsync(obj),
});

const updateLastRequest = (_id: string) =>
  productService.atomic.updateOne(
    { _id },
    {
      $set: {
        lastRequest: new Date(),
      },
    },
  );

const privateFields = ['fileReference', 'userId'];

const getPublic = (product: Product | null) => _.omit(product, privateFields);

export default Object.assign(productService, {
  updateLastRequest,
  getPublic,
});
