'use client';
import * as runtime from 'react/jsx-runtime';
import type { ComponentType } from 'react';
import { ThesisBox } from './thesis-box';
import { KPIRibbon } from './kpi-ribbon';
import { ChartEmbed } from './chart-embed';
import { PullQuote } from './pull-quote';
import { RiskNote } from './risk-note';
import { SourceList } from './source-list';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MDXComponents = Record<string, ComponentType<any>>;

function getMDXComponent(code: string): ComponentType<{ components?: MDXComponents }> {
  const fn = new Function(code);
  return fn(runtime).default as ComponentType<{ components?: MDXComponents }>;
}

const COMPONENTS: MDXComponents = {
  ThesisBox,
  KPIRibbon,
  ChartEmbed,
  PullQuote,
  RiskNote,
  SourceList,
};

export function MDXContent({ code }: { code: string }) {
  const Component = getMDXComponent(code);
  return <Component components={COMPONENTS} />;
}
