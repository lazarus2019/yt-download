import { mockDownloadMP3, mockDownloadVideo } from '@/configs/mockData';
import { useEffect, useState } from 'react';

export const ConvertTab = () => {
  const [tab, setTab] = useState(1);

  return (
    <div>
      <div>
        <TabTrigger
          label="Audio"
          index={1}
          onClick={setTab}
          activeIndex={tab}
        />
        <TabTrigger
          label="Video"
          index={2}
          onClick={setTab}
          activeIndex={tab}
        />
        <TabTrigger
          label="Other"
          index={3}
          onClick={setTab}
          activeIndex={tab}
        />
      </div>

      <div>
        <TabContent index={1} activeIndex={tab} data={mockDownloadMP3} />
        <TabContent index={2} activeIndex={tab} data={mockDownloadVideo} />
        <TabContent index={3} activeIndex={tab} data={mockDownloadMP3} />
      </div>
    </div>
  );
};

interface TabTriggerProps {
  label: string;
  index: number;
  onClick: (index: number) => void;
  activeIndex: number;
}

const TabTrigger = ({
  index,
  activeIndex,
  label,
  onClick,
}: TabTriggerProps) => {
  const handleClick = () => {
    if (activeIndex === index) return;
    onClick(index);
  };
  return <button onClick={handleClick}>{label}</button>;
};

type ConvertData = {
  fileType: string; // 'video' | 'audio';
  url: string;
  quality: string;
};

interface TabContentProps {
  index: number;
  activeIndex: number;
  data: ConvertData[];
}

const tableHeader = ['File type', 'Format', 'Action'];

const getFileTypeLabel = (fileType: string, quality: string) => {
  if (fileType === 'video') return `${quality}p (.mp4)`;

  return `MP3 - ${quality}kbps`;
};

const TabContent = ({ index, activeIndex, data }: TabContentProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted) return;

    if (activeIndex === index) setIsMounted(true);
  }, [activeIndex, index, isMounted]);

  if (!isMounted) return null;

  return (
    <table
      style={{
        display: activeIndex === index ? 'table' : 'none',
      }}
    >
      <thead>
        <tr>
          {tableHeader.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={`${item.fileType}-${item.quality}`}>
            <td>{getFileTypeLabel(item.fileType, item.quality)}</td>
            <td>Auto</td>
            <td>
              <a target="_blank" rel="noreferrer" href={item.url}>
                Download
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
