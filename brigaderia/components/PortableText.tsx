import { PortableText, PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Link from "next/link";

const components: PortableTextComponents = {
  marks: {
    link: ({
      children,
      value,
    }: {
      children: React.ReactNode;
      value: { href: string; internal?: boolean };
    }) => {
      const isInternal = value?.internal;
      const href = value?.href || "#";

      return isInternal ? (
        <Link href={href} className="text-blue-600 underline">
          {children}
        </Link>
      ) : (
        <a
          href={href}
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    },
  },
};

type CustomPortableTextProps = {
  value: PortableTextBlock[];
};

export default function CustomPortableText({ value }: CustomPortableTextProps) {
  return <PortableText value={value} components={components} />;
}
