import React, { useState, ReactElement, PropsWithChildren } from 'react';
import { Link, navigate } from 'gatsby';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Auth } from 'aws-amplify';

import {
  HiOutlineCalendar,
  HiOutlineUserGroup,
  HiOutlineTrendingUp,
  HiOutlineChat,
  HiOutlineCog,
  HiOutlineUser,
} from 'react-icons/hi';

const SideBarStyles = styled.div.attrs<Props>(function assignProps(
  incomingProps
) {
  return {
    props: incomingProps,
  };
})`
  ${tw`bg-gray-300 h-full flex-shrink-0`}

  aside {
    ${tw`h-full w-64 flex flex-col px-12 py-10`}
  }

  h3 {
    ${tw`text-3xl font-bold mb-8`}
  }

  li {
    ${tw`flex text-xl font-medium leading-none mb-6 -ml-0.5`}

    svg {
      ${tw`text-red-400 mr-2 -mt-0.5`}
    }
  }

  .sidebar_profile-footer {
    ${tw`w-full flex-grow justify-self-end flex items-end`}
  }

  .sidebar_user-icon {
    ${tw`bg-gray-400 bg-opacity-75 rounded-full p-1`}

    svg {
      ${tw`text-4xl`}
    }
  }

  .sidebar_showprofile-button {
    ${tw`ml-3 text-left pb-1`}

    h4 {
      ${tw`font-semibold text-lg leading-none`}
    }
    p {
      ${tw`text-red-400 font-light text-base leading-none tracking-wide`}
    }
  }
`;

export function SideBar({}: PropsWithChildren<Props>): ReactElement {
  var [token, setToken] = useState<string>('');
  return (
    <SideBarStyles>
      <aside>
        <h3>Scheduler</h3>
        <ul>
          <li>
            <HiOutlineCalendar />
            <Link to="">Scheduler</Link>
          </li>
          <li>
            <HiOutlineUserGroup />
            <Link to="">Schüler</Link>
          </li>
          <li>
            <HiOutlineTrendingUp />
            <Link to="">Einnahmen</Link>
          </li>
          <li>
            <HiOutlineChat />
            <Link to="">Chat</Link>
          </li>
          <li>
            <HiOutlineCog />
            <Link to="">Settings</Link>
          </li>
          <li>
            <button
              onClick={() => Auth.signOut().then(() => navigate('/login'))}
            >
              Log Out
            </button>
          </li>
          <li>
            <button onClick={() => console.log({ token })}>Log Token</button>
          </li>
        </ul>
        <div className="sidebar_profile-footer">
          <button onClick={() => {}}>
            <div className="sidebar_user-icon">
              <HiOutlineUser />
            </div>
          </button>
          <button className="sidebar_showprofile-button">
            <h4>Username</h4>
            <p onClick={() => {}}>View Profile</p>
          </button>
        </div>
      </aside>
    </SideBarStyles>
  );

  // async function signUp(): Promise<void> {
  //   var email = prompt('Email') || 'lappen@mail.com';
  //   var password = prompt('password') || 'lappen1';
  //   var address = prompt('Address') || 'Boxhagener Straße Berlin';
  //   var name = prompt('name') || 'Milchbubi McLappin';
  //   var instruments = ['bass', 'guitar', 'piano'];

  //   try {
  //     const data = await Auth.signUp({
  //       username: email,
  //       password,
  //       clientMetadata: {
  //         name,
  //         address,
  //         instruments: JSON.stringify(instruments),
  //       },
  //     });
  //     console.log(data);
  //     console.log(data.user);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // async function logIn(): Promise<void> {
  //   var username = prompt('Username') || 'test@testing.com';
  //   var password = prompt('password') || 'mypass123';

  //   try {
  //     await Auth.signIn(username, password);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // async function getUserInfo(): Promise<void> {
  //   if (!token) {
  //     var idToken = await Auth.currentSession().then(user => user.getIdToken());
  //     var jwtToken = idToken.getJwtToken();
  //     setToken(jwtToken);
  //   }
  //   fetch(
  //     'https://e5xhnkqia5.execute-api.us-east-1.amazonaws.com/dev/users/test',
  //     {
  //       headers: {
  //         Authorization: token,
  //       },
  //     }
  //   )
  //     .then(res => res.json())
  //     .then(console.log);
  // }
}

interface Props {}
