import type { Schema, Struct } from '@strapi/strapi';

export interface InfoBlockInfoBlock extends Struct.ComponentSchema {
  collectionName: 'components_info_block_info_blocks';
  info: {
    displayName: 'InfoBlock';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    header: Schema.Attribute.String & Schema.Attribute.Required;
    imagePosition: Schema.Attribute.Enumeration<['top', 'right', 'left']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'top'>;
    media: Schema.Attribute.Component<'media.file-media', false>;
  };
}

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
      'info-block.info-block': InfoBlockInfoBlock;
      'media.file-media': MediaFileMedia;
    }
  }
}
