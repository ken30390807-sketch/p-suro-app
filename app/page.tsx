'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>設定推測カウンター</h1>

      <Link href="/lycoris">
        リコリス・リコイル →
      </Link>
    </main>
  );
}