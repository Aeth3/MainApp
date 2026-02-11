/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import React from 'react';
import { Text, useColorScheme } from 'react-native';

const COLORS = {
    light: {
        background: '#EAF6FF',        // soft sky blue
        backgroundHighlight: '#D6F0EB', // light teal tint
        cardBackground: '#FFFFFF',   // clean white for contrast
        cardOutline: '#CBD5D1',      // cool gray-green outline
        textPrimary: '#1F2937',      // dark gray (readable on light bg)
        textSecondary: '#4B5563',    // softer gray
        accent: '#004B49',           // navy green (main theme)
        accentSecondary: '#2DD4BF',  // teal accent
        warning: '#FBBF24',          // warm yellow for highlights
    },
    dark: {
        background: '#0B1C1A',       // very dark greenish background
        backgroundHighlight: '#193C47', // subtle teal/blue-green
        cardBackground: '#1E2A28',   // deep green-gray for cards
        cardOutline: '#3B4A47',      // muted outline
        textPrimary: '#F9FAFB',      // off-white
        textSecondary: '#9CA3AF',    // gray for secondary text
        accent: '#2DD4BF',           // teal pops well in dark mode
        accentSecondary: '#4ADE80',  // fresh green
        warning: '#FACC15',          // softer yellow for alerts
    },
};

export function useTheme() {
    const colorScheme = useColorScheme();

    return {
        colors: COLORS[colorScheme === 'dark' ? 'dark' : 'light'],
    };
}

export function ThemedText({ color, style, ...props }) {
    const { colors } = useTheme();

    return (
        <Text
            style={[
                {
                    color: color === 'secondary' ? colors.textSecondary : colors.textPrimary,
                },
                style,
            ]}
            {...props}
        />
    );
}
