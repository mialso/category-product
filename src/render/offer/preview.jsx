import React from 'react';
import { connect } from 'react-redux';
import {
    PDFViewer,
    Document, Page, Text, View, StyleSheet, Image,
} from '@react-pdf/renderer';
import { offerTitle, offerCompanyName } from 'offer/selector';

import './preview.css';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
});

const testIm = '/test_cow.jpg';

const HeadImg = () => (
    <Image src={testIm} />
);
const SampleDocument = ({ title, companyName }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <HeadImg />
            <View style={styles.section}>
                <Text>{title}</Text>
            </View>
            <View style={styles.section}>
                <Text>{companyName}</Text>
            </View>
        </Page>
    </Document>
);

export const PreviewRaw = ({ title, companyName }) => (
    <div className="Preview">
        <div>Preview</div>
        <PDFViewer className="Preview">
            <SampleDocument title={title} companyName={companyName} />
        </PDFViewer>
    </div>
);

const Preview = connect(
    (state) => ({
        title: offerTitle(state),
        companyName: offerCompanyName(state),
    }),
)(PreviewRaw);

export const PreviewConfig = () => (
    <div className="PreviewConfig">
        <div>Preview Config</div>
        <label htmlFor="format">Format</label>
        <select name="format" defaultValue="">
            <option value="" disabled>...choose format</option>
            <option value="A4">A4</option>
        </select>
    </div>
);

export const OfferPreview = () => (
    <div className="OfferPreview">
        <PreviewConfig />
        <Preview />
    </div>
);
