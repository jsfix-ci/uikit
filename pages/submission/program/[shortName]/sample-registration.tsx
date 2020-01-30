import React from 'react';

import { createPage } from 'global/utils/pages';
import ProgramSampleRegistration from 'components/pages/submission-system/program-sample-registration';
import { isRdpcMember, canReadProgram, canWriteProgramData } from 'global/utils/egoJwt';
import { useProgramCheckEffect } from 'global/hooks/useProgramCheckEffect';

export default createPage({
  isPublic: false,
  isAccessible: async ({ egoJwt, ctx }) => {
    const {
      query: { shortName },
    } = ctx;
    return (
      !isRdpcMember(egoJwt) &&
      canReadProgram({ egoJwt, programId: String(shortName) }) &&
      canWriteProgramData({ egoJwt, programId: String(shortName) })
    );
  },
  startWithGlobalLoader: true,
})(props => {
  useProgramCheckEffect();
  return <ProgramSampleRegistration {...props} />;
});
