import type { Schema, Struct } from '@strapi/strapi';

export interface MediaFileMedia extends Struct.ComponentSchema {
  collectionName: 'components_media_file_medias';
  info: {
    description: '';
    displayName: 'FileMedia';
    icon: 'picture';
  };
  attributes: {
    alternativeText: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
    description: Schema.Attribute.Text;
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 255;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'media.file-media': MediaFileMedia;
    }
  }
}
