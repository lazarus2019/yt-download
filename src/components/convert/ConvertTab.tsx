import { mockDownloadMP3 } from '@/configs/mockData';
import { getFileTypeLabel } from '@/helpers/video';
import { ConvertData, FileType } from '@/types/common';
import { useEffect, useState } from 'react';
import { downloadTypes, tableConvertHeaders } from './configs';

import classNames from './convert.module.scss';
import clsx from 'clsx';

export const ConvertTab = () => {
  const [tab, setTab] = useState<FileType>(downloadTypes[0].type);

  return (
    <div className={classNames['tab-container']}>
      <div className={classNames['tab-trigger-container']}>
        {downloadTypes.map((item) => (
          <TabTrigger
            key={`tab-trigger-${item.type}`}
            label={item.label}
            index={item.type}
            onClick={setTab}
            activeIndex={tab}
          />
        ))}
      </div>

      {downloadTypes.map((item) => (
        <TabContent
          key={`tab-content-${item.type}`}
          index={item.type}
          activeIndex={tab}
          data={mockDownloadMP3} // replace with passing data
        />
      ))}
    </div>
  );
};

interface TabTriggerProps {
  label: string;
  index: FileType;
  onClick: (index: FileType) => void;
  activeIndex: FileType;
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
  return (
    <button
      className={clsx(classNames['tab-trigger'], {
        [classNames['active']]: activeIndex === index,
      })}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

interface TabContentProps {
  index: FileType;
  activeIndex: FileType;
  data: ConvertData[];
}

const TabContent = ({ index, activeIndex, data }: TabContentProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isMounted) return;

    if (activeIndex === index) setIsMounted(true);
  }, [activeIndex, index, isMounted]);

  if (!isMounted) return null;

  return (
    <table
      className={clsx(classNames['tab-content'], {
        [classNames['active']]: activeIndex === index,
      })}
    >
      <thead>
        <tr>
          {tableConvertHeaders.map((header, index) => (
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
              <a
                className={classNames['download-btn']}
                target="_blank"
                rel="noreferrer"
                href={item.url}
              >
                Icon Download
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
