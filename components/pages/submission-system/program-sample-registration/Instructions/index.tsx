import { CONTACT_PAGE_PATH } from 'global/constants/pages';
import Link from 'uikit/Link';
import * as React from 'react';
import { css } from 'uikit';
import Button, { BUTTON_SIZES, BUTTON_VARIANTS } from 'uikit/Button';
import Icon from 'uikit/Icon';
import InstructionBox from 'uikit/InstructionBox';
import HyperLink from 'uikit/Link';
import Typography from 'uikit/Typography';
import RegisterSamplesModal from './RegisterSamplesModal';
import { useMutation } from '@apollo/react-hooks';
import UPLOAD_REGISTRATION from '../gql/UPLOAD_REGISTRATION.gql';
import {
  instructionBoxButtonIconStyle,
  instructionBoxButtonContentStyle,
  instructionBoxButtonStyle,
  downloadTsvFileTemplate,
} from '../../common';
import FileSelectButton from 'uikit/FileSelectButton';
import { getConfig } from 'global/config';
import urljoin from 'url-join';
import { DOCS_DICTIONARY_PATH } from 'global/constants/docSitePaths';
import useCommonToasters from 'components/useCommonToasters';

function Instructions({
  uploadEnabled,
  registrationEnabled,
  shortName,
  registrationId,
}: {
  uploadEnabled: boolean;
  registrationEnabled: boolean;
  shortName: string;
  registrationId: string;
}) {
  const { DOCS_URL_ROOT } = getConfig();
  const footerContentStyle = css`
    text-align: center;
    width: 100%;
    padding-bottom: 10px;
    padding-top: 8px;
  `;

  const downloadTemplate = () => {
    downloadTsvFileTemplate('sample_registration.tsv');
  };

  const [showRegisterSamplesModal, setShowRegisterSamplesModal] = React.useState(false);
  const handleRegisterClick = () => {
    setShowRegisterSamplesModal(true);
  };

  const handleRegisterCancelClick = () => {
    setShowRegisterSamplesModal(false);
  };

  const commonToaster = useCommonToasters();

  const [uploadFile, { loading: isUploading }] = useMutation(UPLOAD_REGISTRATION, {
    onError: () => {
      commonToaster.unknownError();
    },
  });

  const handleUpload = file =>
    uploadFile({
      variables: { shortName, registrationFile: file },
    });

  return (
    <>
      <InstructionBox
        steps={[
          <>
            <Typography variant="data" component="span">
              1. Download the registration template and format it using the latest{` `}
              <Link target="_blank" href={urljoin(DOCS_URL_ROOT, DOCS_DICTIONARY_PATH)}>
                Data Dictionary
              </Link>
              .
            </Typography>
            <Button
              css={instructionBoxButtonStyle}
              variant={BUTTON_VARIANTS.SECONDARY}
              size={BUTTON_SIZES.SM}
              onClick={downloadTemplate}
            >
              <span css={instructionBoxButtonContentStyle}>
                <Icon
                  name="download"
                  fill="accent2_dark"
                  height="12px"
                  css={instructionBoxButtonIconStyle}
                />{' '}
                File Template
              </span>
            </Button>
          </>,
          <>
            <Typography variant="data" component="span">
              2. Upload your formatted registration TSV file.
            </Typography>
            <FileSelectButton
              isAsync
              isLoading={isUploading}
              css={instructionBoxButtonStyle}
              variant={BUTTON_VARIANTS.SECONDARY}
              size={BUTTON_SIZES.SM}
              onFilesSelect={async files => {
                if (files[0]) await handleUpload(files[0]);
              }}
              id="button-register-file-select" // For Selenium
              disabled={!uploadEnabled}
            >
              <span css={instructionBoxButtonContentStyle}>
                <Icon
                  name="upload"
                  fill={uploadEnabled ? 'accent2_dark' : 'white'}
                  height="12px"
                  css={instructionBoxButtonIconStyle}
                />{' '}
                Upload File
              </span>
            </FileSelectButton>
          </>,
          <>
            <Typography variant="data" component="span">
              3. When your sample list is valid and QC is complete, submit your registration.
            </Typography>
            <Button
              id="button-register-samples-commit"
              css={instructionBoxButtonStyle}
              variant={BUTTON_VARIANTS.PRIMARY}
              size={BUTTON_SIZES.SM}
              disabled={!registrationEnabled}
              onClick={handleRegisterClick}
            >
              Register Samples
            </Button>
          </>,
        ]}
        footer={
          <div css={footerContentStyle}>
            <Typography variant="data">
              If you have any changes to previously registered data, please {` `}
              <Link href={CONTACT_PAGE_PATH}>
                <HyperLink>contact the DCC</HyperLink>
              </Link>
              .
            </Typography>
          </div>
        }
      />
      {showRegisterSamplesModal && (
        <RegisterSamplesModal
          onCancelClick={handleRegisterCancelClick}
          shortName={shortName}
          registrationId={registrationId}
        />
      )}
    </>
  );
}

export default Instructions;
