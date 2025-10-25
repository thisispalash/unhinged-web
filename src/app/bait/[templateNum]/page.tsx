// src/app/bait/0/page.tsx
import type { Metadata } from 'next';
import View from './View';

type Props = {
  params: { templateNum: string };
  searchParams: { user?: string };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { user } = await searchParams;
  const { templateNum } = await params;

  // TODO: Get user and take from database
  // Related TODO: Add user and take to database

  let imgSrc, imgW, imgH;

  switch (templateNum) {
    case '0':
      imgSrc = 'https://nhinged.io/img/template0.png'; // TODO: optimize image for cards
      imgW = 900;
      imgH = 1200;
      break;
    case '1':
      imgSrc = 'https://nhinged.io/img/template1.png';
      imgW = 1200;
      imgH = 900;
      break;
    case '2':
      imgSrc = 'https://nhinged.io/img/template2.png';
      imgW = 1200;
      imgH = 900;
      break;
    default:
      imgSrc = 'https://nhinged.io/img/template1.png';
      imgW = 1200;
      imgH = 900;
      break;
  }
  
  return {
    title: `Unhinged | Baited by ${user}`,
    description: `Baited by ${user} on Unhinged`,
    openGraph: {
      title: 'Unhinged | Baited',
      description: `Baited by ${user} on Unhinged`,
      url: 'https://nhinged.io',
      images: [
        {
          url: imgSrc,
          width: imgW,
          height: imgH,
          alt: `Unhinged | Baited by ${user}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@theprimefibber',
      creator: '@theprimefibber',
      title: 'Unhinged | Baited',
      description: `Baited by ${user} on Unhinged`,
      images: [imgSrc],
    },
  };
}

export default async function Page({ params, searchParams }: Props) {
  const { user } = await searchParams;
  let { templateNum } = await params;

  if (templateNum !== '0' && templateNum !== '1' && templateNum !== '2') {
    templateNum = '1'; // default to template 1
  }

  return <View templateNum={templateNum} user={user} />;
}