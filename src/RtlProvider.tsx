import React from 'react';
import {create} from 'jss';
import rtl from 'jss-rtl';
import {StylesProvider, jssPreset, ThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const jss = create({plugins: [...jssPreset().plugins, rtl()]});

const theme = createMuiTheme({
    direction: 'rtl',
});

export const RtlProvider: React.FC<{ children: React.ReactNode }> = ({children}) => (
    <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
            <div dir="rtl">{children}</div>
        </ThemeProvider>
    </StylesProvider>
);
