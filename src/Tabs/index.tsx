/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { css } from '@emotion/react';
import { styled } from '../ThemeProvider';
import clsx from 'clsx';
import React from 'react';
import useTheme from '../utils/useTheme';

const TabsContext = React.createContext({ onChange: null, value: null });

export const TabButton = styled('button')<{ as?: keyof HTMLElementTagNameMap }>`
  ${({ theme }) => css(theme.typography.label as any)};
  color: ${({ theme }) => theme.colors.grey};
  display: flex;
  border: 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors.grey_2};
  background-color: transparent;
  padding: 14px 51px;
  cursor: pointer;
  user-select: none;
  outline: none;

  &:hover {
    border-bottom-color: ${({ theme }) => theme.colors.grey_1};
  }

  &.active {
    border-bottom-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const Tab: React.ComponentType<
  {
    label?: string;
    value?: string;
    empty?: boolean;
    className?: string;
  } & React.ComponentProps<typeof TabButton>
> = ({ label, value, empty, children, className, ...otherProps }) => {
  const theme = useTheme();

  const { onChange, value: currentValue } = React.useContext(TabsContext);

  return empty ? (
    <TabButton
      className={className}
      as="div"
      css={css`
        cursor: auto;
        flex-grow: 1;
        &:hover {
          border-bottom-color: ${theme.colors.grey_2};
        }
      `}
      {...otherProps}
    >
      {children}
    </TabButton>
  ) : (
    <TabButton
      className={clsx({ active: currentValue === value }, className)}
      onClick={(e) => onChange(e, value)}
      {...otherProps}
    >
      {label}
    </TabButton>
  );
};

const Container = styled('div')`
  display: flex;
`;

export const Tabs: React.ComponentType<
  React.PropsWithChildren<{
    value: any;
    onChange?: (...any) => void;
    containerProps?: {};
  }>
> = ({ value, onChange, children, containerProps }) => {
  const context = {
    value,
    onChange,
  };

  return (
    <TabsContext.Provider value={context}>
      <Container {...containerProps}>{children}</Container>
    </TabsContext.Provider>
  );
};
