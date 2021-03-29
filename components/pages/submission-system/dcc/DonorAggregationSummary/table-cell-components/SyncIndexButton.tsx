import { useState } from 'react';
import urlJoin from 'url-join';

import useTheme from 'uikit/utils/useTheme';
import Button from 'uikit/Button';
import Typography from 'uikit/Typography';

import useAuthContext from 'global/hooks/useAuthContext';
import { getConfig } from 'global/config';
const { GATEWAY_API_ROOT } = getConfig();
import { DONOR_AGGREGATOR_SYNC_PROGRAM } from 'global/constants/gatewayApiPaths';

export default ({ program }: { program: string }) => {
  const theme = useTheme();
  const [requestResult, setRequestResult] = useState<'SUCCESS' | 'ERROR' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const { fetchWithEgoToken } = useAuthContext();

  // On Click Handler sends request to gateway to sync program
  const sendSyncRequest = async () => {
    await fetchWithEgoToken(urlJoin(GATEWAY_API_ROOT, DONOR_AGGREGATOR_SYNC_PROGRAM), {
      method: 'POST',
      headers: { ['Content-Type']: 'application/json' },
      body: JSON.stringify({
        programId: program,
      }),
    })
      .then((response) => setRequestResult('SUCCESS'))
      .catch((error) => {
        console.log(`Error sending sync request for ${program}:`, error);
        setRequestResult('ERROR');
        setErrorMessage('' + error);
      });
  };

  switch (requestResult) {
    case 'SUCCESS':
      return (
        <Typography component="span" bold color="success">
          Sync Initiated
        </Typography>
      );
    case 'ERROR':
      return (
        <div style={{ flexDirection: 'column' }}>
          <Typography component="div" bold color="error">
            Error:
          </Typography>
          <Typography component="div">{errorMessage}</Typography>
        </div>
      );

    default:
      return (
        <Button
          disabled={!!requestResult}
          isAsync
          onClick={sendSyncRequest}
          size="sm"
          variant="primary"
        >
          Sync: {program}
        </Button>
      );
  }
};
