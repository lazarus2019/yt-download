import { ConvertTab } from './ConvertTab';
import { YoutubeEmbed } from './YoutubeEmbed';

export const ConvertSection = () => {
  return (
    <section>
      <div>
        <YoutubeEmbed videoId="C_29TAVQrm8" />
      </div>
      <div>
        <ConvertTab />
      </div>
    </section>
  );
};
