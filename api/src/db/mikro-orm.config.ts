import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

export default {
  entities: ['./public/entities'],
  entitiesTs: ['./src/entities'],
  metadataProvider: TsMorphMetadataProvider,
  cache: { options: { cacheDir: 'cache' } },
  seeder: {
    path: './public/db/seeders',
    pathTs: './src/db/seeders',
    defaultSeeder: 'DatabaseSeeder',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
    fileName: (className: string) => className,
  },
};
