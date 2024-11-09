import { ConvertTab } from './ConvertTab';
import { YoutubeEmbed } from './YoutubeEmbed';

import classNames from './convert.module.scss';

export const ConvertSection = () => {
  return (
    <section className={classNames['convert-section']}>
      <YoutubeEmbed videoId="C_29TAVQrm8" />
      <ConvertTab />
    </section>
  );
};
