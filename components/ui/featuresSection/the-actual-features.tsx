"use client";
import { cn } from "@/components/ui/featuresSection/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/featuresSection/bento-grid";
import { IconLockSquareRounded, IconCloudLock, IconSnowflake, IconChecks, IconCircleKey } from '@tabler/icons-react';

import { useTranslation } from 'react-i18next';
export function FeaturesGrid() {
    const { t } = useTranslation();
    const items = [
        {
          title: t('feature-1-name'),
          description: t('feature-1-description'),
          header: <Feature1 />,
          className: "md:col-span-2",
          },
      
          {
          title: t('feature-2-name'),
          description: t('feature-2-description'),
          header: <Feature2 />,
          className: "md:col-span-1",
        },
        {
          title: t('feature-3-name'),
          description: t('feature-3-description'),
          header: <Feature3 />,
          className: "md:col-span-1",
        },
        {
          title: t('feature-4-name'),
          description: t('feature-4-description'),
          header: <Feature4 />,
          className: "md:col-span-1",
        },
        {
          title: t('feature-5-name'),
          description: t('feature-5-description'),
          header: <Feature5 />,
          className: "md:col-span-1",
        },
      ];
      
  return (
    <BentoGrid className="max-w-[1204px] mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className)}
        />
      ))}
    </BentoGrid>
  );
}

const Feature1 = () => {
  return (
    <IconLockSquareRounded size="100%" color="var(--featureIconColor)" />
  );
};

const Feature2 = () => {
    return (
        <IconCloudLock size="100%" color="var(--featureIconColor)" />
      );
};

const Feature3 = () => {
    return (
        <IconSnowflake size="100%" color="var(--featureIconColor)" />
    );

};
const Feature4 = () => {
  return (
    <IconChecks size="100%" color="var(--featureIconColor)" />
  );
};

const Feature5 = () => {
    return (
      <IconCircleKey size="100%" color="var(--featureIconColor)" />
    );
  };
