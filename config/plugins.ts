export default ({ env }) => ({
    upload: {
        config: {
            provider: "aws-s3",
            providerOptions: {
                s3Options: {
                    credentials: {
                        accessKeyId: env("AWS_ACCESS_KEY_ID"),
                        secretAccessKey: env("AWS_ACCESS_SECRET"),
                    },
                    region: env("AWS_REGION"),
                    params: {
                        ACL: env("AWS_ACL", "public-read"),
                        signedUrlExpires: env("AWS_SIGNED_URL_EXPIRES", 15 * 60),
                        Bucket: env("AWS_BUCKET"),
                    },
                },
            },
        },
    },
    email: {
        config: {
            provider: 'amazon-ses',
            providerOptions: {
                key: env('AWS_ACCESS_KEY_ID'),
                secret: env('AWS_ACCESS_SECRET'),
                amazon: `https://email.${env('AWS_REGION')}.amazonaws.com`,
            },
            settings: {
                defaultFrom: env('EMAIL_DEFAULT_FROM'),
                defaultReplyTo: env('EMAIL_DEFAULT_REPLY_TO')
            },
        },
    },
});
