import * as React from 'react';

import {Action} from '../../types';
import Avatar from '../Avatar';
import {buttonFrom} from '../Button';
import Card from '../Card';
import SettingAction from '../SettingAction';
import Stack from '../Stack';
import TextContainer from '../TextContainer';
import TextStyle from '../TextStyle';

import * as styles from './AccountConnection.scss';

export interface Props {
  connected?: boolean,
  action?: Action,
  avatarUrl?: string,
  accountName?: string,
  title?: React.ReactNode,
  details?: React.ReactNode,
  termsOfService?: React.ReactNode,
}

export default function AccountConnection({
  connected = false,
  action,
  avatarUrl,
  accountName = '',
  title,
  details,
  termsOfService,
}: Props) {
  const initials = accountName ? accountName.split(/\s+/).map((name) => name[0]).join('') : undefined;

  const avatarMarkup = connected
    ? (
      <Avatar
        accessibilityLabel=""
        name={accountName}
        initials={initials}
        source={avatarUrl}
      />
    )
    : null;

  const titleMarkup = title
    ? <div>{title}</div>
    : <div>{accountName}</div>;

  const detailsMarkup = details
    ? <div><TextStyle variation="subdued">{details}</TextStyle></div>
    : null;

  const termsOfServiceMarkup = termsOfService
    ? <div className={styles.TermsOfService}>{termsOfService}</div>
    : null;

  const actionElement = action
    ? buttonFrom(action, {primary: !connected})
    : null;

  return (
    <Card sectioned>
      <SettingAction action={actionElement}>
        <Stack>
          {avatarMarkup}
          <Stack.Item fill>
            <TextContainer>
              {titleMarkup}
              {detailsMarkup}
            </TextContainer>
          </Stack.Item>
        </Stack>
      </SettingAction>
      {termsOfServiceMarkup}
    </Card>
  );
}
