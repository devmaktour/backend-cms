import type { Schema, Struct } from '@strapi/strapi';

export interface MediaFileMedia extends Struct.ComponentSchema {
  collectionName: 'components_media_file_medias';
  info: {
    displayName: 'FileMedia';
    icon: 'picture';
  };
  attributes: {
    alternative_text: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text;
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'media.file-media': MediaFileMedia;
    }
  }
}
