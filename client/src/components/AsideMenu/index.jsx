import React from 'react';
import styles from './AsideMenu.module.scss';
import { Link, NavLink } from 'react-router-dom';

export const AsideMenu = () => {
  return (
    <aside className={styles.aside}>
      <Link to="/">
        <img src="img/logo.svg" alt="" />
      </Link>
      <menu>
        <ul>
          <NavLink
            to="/"
            className={({ isActive }) => {
              return isActive ? `${styles.active}` : '';
            }}
          >
            <li>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_352_1669)">
                  <path
                    d="M19.2675 7.5575L12.9466 1.23583C12.1643 0.45582 11.1047 0.017807 9.99998 0.017807C8.89526 0.017807 7.83561 0.45582 7.05331 1.23583L0.73248 7.5575C0.499501 7.78898 0.314788 8.06441 0.189048 8.36782C0.0633088 8.67122 -0.000955851 8.99657 -2.04513e-05 9.325V17.5058C-2.04513e-05 18.1689 0.263372 18.8048 0.732213 19.2736C1.20105 19.7424 1.83694 20.0058 2.49998 20.0058H17.5C18.163 20.0058 18.7989 19.7424 19.2677 19.2736C19.7366 18.8048 20 18.1689 20 17.5058V9.325C20.0009 8.99657 19.9367 8.67122 19.8109 8.36782C19.6852 8.06441 19.5005 7.78898 19.2675 7.5575ZM12.5 18.3392H7.49998V15.0608C7.49998 14.3978 7.76337 13.7619 8.23221 13.2931C8.70105 12.8242 9.33694 12.5608 9.99998 12.5608C10.663 12.5608 11.2989 12.8242 11.7677 13.2931C12.2366 13.7619 12.5 14.3978 12.5 15.0608V18.3392ZM18.3333 17.5058C18.3333 17.7268 18.2455 17.9388 18.0892 18.0951C17.933 18.2514 17.721 18.3392 17.5 18.3392H14.1666V15.0608C14.1666 13.9558 13.7277 12.896 12.9463 12.1146C12.1649 11.3331 11.105 10.8942 9.99998 10.8942C8.89491 10.8942 7.8351 11.3331 7.0537 12.1146C6.2723 12.896 5.83331 13.9558 5.83331 15.0608V18.3392H2.49998C2.27897 18.3392 2.067 18.2514 1.91072 18.0951C1.75444 17.9388 1.66665 17.7268 1.66665 17.5058V9.325C1.66742 9.10414 1.75514 8.89248 1.91081 8.73583L8.23165 2.41666C8.7014 1.9491 9.3372 1.68661 9.99998 1.68661C10.6628 1.68661 11.2986 1.9491 11.7683 2.41666L18.0891 8.73833C18.2442 8.89437 18.3319 9.10501 18.3333 9.325V17.5058Z"
                    fill="#FFF"
                  />
                </g>
              </svg>
              Главная
            </li>
          </NavLink>
          <NavLink
            to="applications?filter=Все+заявки"
            className={({ isActive }) => {
              return isActive ? `${styles.active}` : '';
            }}
          >
            <li>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_352_1671)">
                  <path
                    d="M16.2792 2.60164L14.8992 1.21997C14.5131 0.831898 14.0538 0.524253 13.548 0.314841C13.0422 0.105429 12.4999 -0.00159244 11.9525 -2.88885e-05H6.66667C5.562 0.00129433 4.50296 0.440706 3.72185 1.22182C2.94073 2.00294 2.50132 3.06198 2.5 4.16664V15.8333C2.50132 16.938 2.94073 17.997 3.72185 18.7781C4.50296 19.5592 5.562 19.9987 6.66667 20H13.3333C14.438 19.9987 15.497 19.5592 16.2782 18.7781C17.0593 17.997 17.4987 16.938 17.5 15.8333V5.54747C17.5013 5.00012 17.3941 4.45794 17.1846 3.9523C16.975 3.44665 16.6673 2.98758 16.2792 2.60164ZM15.1008 3.77997C15.219 3.89774 15.3249 4.0273 15.4167 4.16664H13.3333V2.0833C13.4724 2.17607 13.6022 2.28212 13.7208 2.39997L15.1008 3.77997ZM15.8333 15.8333C15.8333 16.4963 15.5699 17.1322 15.1011 17.6011C14.6323 18.0699 13.9964 18.3333 13.3333 18.3333H6.66667C6.00363 18.3333 5.36774 18.0699 4.8989 17.6011C4.43006 17.1322 4.16667 16.4963 4.16667 15.8333V4.16664C4.16667 3.5036 4.43006 2.86771 4.8989 2.39887C5.36774 1.93003 6.00363 1.66664 6.66667 1.66664H11.6667V4.16664C11.6667 4.60867 11.8423 5.03259 12.1548 5.34515C12.4674 5.65771 12.8913 5.83331 13.3333 5.83331H15.8333V15.8333ZM13.3333 7.49997C13.5543 7.49997 13.7663 7.58777 13.9226 7.74405C14.0789 7.90033 14.1667 8.11229 14.1667 8.33331C14.1667 8.55432 14.0789 8.76628 13.9226 8.92256C13.7663 9.07884 13.5543 9.16664 13.3333 9.16664H6.66667C6.44565 9.16664 6.23369 9.07884 6.07741 8.92256C5.92113 8.76628 5.83333 8.55432 5.83333 8.33331C5.83333 8.11229 5.92113 7.90033 6.07741 7.74405C6.23369 7.58777 6.44565 7.49997 6.66667 7.49997H13.3333ZM14.1667 11.6666C14.1667 11.8877 14.0789 12.0996 13.9226 12.2559C13.7663 12.4122 13.5543 12.5 13.3333 12.5H6.66667C6.44565 12.5 6.23369 12.4122 6.07741 12.2559C5.92113 12.0996 5.83333 11.8877 5.83333 11.6666C5.83333 11.4456 5.92113 11.2337 6.07741 11.0774C6.23369 10.9211 6.44565 10.8333 6.66667 10.8333H13.3333C13.5543 10.8333 13.7663 10.9211 13.9226 11.0774C14.0789 11.2337 14.1667 11.4456 14.1667 11.6666ZM14.0067 14.5108C14.1362 14.689 14.1899 14.9113 14.156 15.129C14.1221 15.3467 14.0034 15.5421 13.8258 15.6725C12.9815 16.2741 11.9815 16.6193 10.9458 16.6666C10.3407 16.6637 9.75402 16.4584 9.27917 16.0833C9.00583 15.8958 8.90167 15.8333 8.69583 15.8333C8.13869 15.9195 7.61301 16.1474 7.16917 16.495C6.99312 16.6205 6.7752 16.6726 6.56141 16.6405C6.34762 16.6083 6.15471 16.4943 6.0234 16.3225C5.8921 16.1508 5.83268 15.9347 5.85771 15.72C5.88273 15.5052 5.99023 15.3086 6.1575 15.1716C6.89182 14.6016 7.77357 14.2529 8.69917 14.1666C9.25428 14.1755 9.79094 14.3674 10.2258 14.7125C10.4241 14.8908 10.6793 14.9927 10.9458 15C11.6272 14.9489 12.2825 14.7161 12.8433 14.3258C13.0222 14.1962 13.2452 14.1428 13.4633 14.1775C13.6814 14.2122 13.8769 14.3321 14.0067 14.5108Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_352_1671">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Заявки
            </li>
          </NavLink>
          <NavLink
            to="monitoring"
            className={({ isActive }) => {
              return isActive ? `${styles.active}` : '';
            }}
          >
            <li>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_352_1673)">
                  <path
                    d="M19.1667 18.3333H4.16667C3.50363 18.3333 2.86774 18.0699 2.3989 17.6011C1.93006 17.1323 1.66667 16.4964 1.66667 15.8333V0.833333C1.66667 0.61232 1.57887 0.400358 1.42259 0.244078C1.26631 0.0877974 1.05435 0 0.833333 0C0.61232 0 0.400358 0.0877974 0.244078 0.244078C0.0877974 0.400358 0 0.61232 0 0.833333L0 15.8333C0.00132321 16.938 0.440735 17.997 1.22185 18.7782C2.00296 19.5593 3.062 19.9987 4.16667 20H19.1667C19.3877 20 19.5996 19.9122 19.7559 19.7559C19.9122 19.5996 20 19.3877 20 19.1667C20 18.9457 19.9122 18.7337 19.7559 18.5774C19.5996 18.4211 19.3877 18.3333 19.1667 18.3333Z"
                    fill="white"
                  />
                  <path
                    d="M4.99999 16.6667C5.221 16.6667 5.43296 16.5789 5.58925 16.4226C5.74553 16.2663 5.83332 16.0544 5.83332 15.8333V10C5.83332 9.77899 5.74553 9.56703 5.58925 9.41075C5.43296 9.25447 5.221 9.16667 4.99999 9.16667C4.77898 9.16667 4.56701 9.25447 4.41073 9.41075C4.25445 9.56703 4.16666 9.77899 4.16666 10V15.8333C4.16666 16.0544 4.25445 16.2663 4.41073 16.4226C4.56701 16.5789 4.77898 16.6667 4.99999 16.6667Z"
                    fill="white"
                  />
                  <path
                    d="M8.33334 8.33333V15.8333C8.33334 16.0543 8.42114 16.2663 8.57742 16.4226C8.7337 16.5789 8.94566 16.6667 9.16668 16.6667C9.38769 16.6667 9.59965 16.5789 9.75593 16.4226C9.91221 16.2663 10 16.0543 10 15.8333V8.33333C10 8.11232 9.91221 7.90036 9.75593 7.74408C9.59965 7.5878 9.38769 7.5 9.16668 7.5C8.94566 7.5 8.7337 7.5878 8.57742 7.74408C8.42114 7.90036 8.33334 8.11232 8.33334 8.33333Z"
                    fill="white"
                  />
                  <path
                    d="M12.5 10.8333V15.8333C12.5 16.0543 12.5878 16.2663 12.7441 16.4226C12.9004 16.5789 13.1123 16.6667 13.3333 16.6667C13.5543 16.6667 13.7663 16.5789 13.9226 16.4226C14.0789 16.2663 14.1667 16.0543 14.1667 15.8333V10.8333C14.1667 10.6123 14.0789 10.4004 13.9226 10.2441C13.7663 10.0878 13.5543 10 13.3333 10C13.1123 10 12.9004 10.0878 12.7441 10.2441C12.5878 10.4004 12.5 10.6123 12.5 10.8333Z"
                    fill="white"
                  />
                  <path
                    d="M16.6667 7.50001V15.8333C16.6667 16.0544 16.7545 16.2663 16.9107 16.4226C17.067 16.5789 17.279 16.6667 17.5 16.6667C17.721 16.6667 17.933 16.5789 18.0892 16.4226C18.2455 16.2663 18.3333 16.0544 18.3333 15.8333V7.50001C18.3333 7.27899 18.2455 7.06703 18.0892 6.91075C17.933 6.75447 17.721 6.66667 17.5 6.66667C17.279 6.66667 17.067 6.75447 16.9107 6.91075C16.7545 7.06703 16.6667 7.27899 16.6667 7.50001Z"
                    fill="white"
                  />
                  <path
                    d="M5 7.5C5.22099 7.49995 5.43292 7.41212 5.58916 7.25583L8.5775 4.2675C8.73633 4.11619 8.94729 4.03178 9.16666 4.03178C9.38603 4.03178 9.59699 4.11619 9.75583 4.2675L11.5658 6.0775C12.0346 6.54618 12.6704 6.80946 13.3333 6.80946C13.9962 6.80946 14.632 6.54618 15.1008 6.0775L19.7558 1.4225C19.9076 1.26533 19.9916 1.05483 19.9897 0.836331C19.9878 0.617833 19.9002 0.408823 19.7457 0.254316C19.5912 0.0998096 19.3822 0.0121688 19.1637 0.0102701C18.9452 0.00837147 18.7347 0.0923668 18.5775 0.244165L13.9225 4.89833C13.7662 5.05456 13.5543 5.14232 13.3333 5.14232C13.1124 5.14232 12.9004 5.05456 12.7442 4.89833L10.9342 3.08916C10.4653 2.62049 9.82957 2.3572 9.16666 2.3572C8.50375 2.3572 7.86798 2.62049 7.39916 3.08916L4.41083 6.0775C4.29432 6.19404 4.21498 6.34251 4.18284 6.50414C4.1507 6.66577 4.16721 6.83329 4.23026 6.98554C4.29332 7.13779 4.40011 7.26793 4.53711 7.3595C4.67412 7.45107 4.8352 7.49996 5 7.5Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_352_1673">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Мониторинг
            </li>
          </NavLink>
          <NavLink
            to="employees"
            className={({ isActive }) => {
              return isActive ? `${styles.active}` : '';
            }}
          >
            <li>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_352_1680)">
                  <path
                    d="M10 13.3333C9.34073 13.3333 8.69626 13.1378 8.1481 12.7716C7.59994 12.4053 7.17269 11.8847 6.9204 11.2756C6.66811 10.6665 6.6021 9.99631 6.73072 9.3497C6.85933 8.7031 7.1768 8.10915 7.64298 7.64298C8.10915 7.1768 8.7031 6.85934 9.3497 6.73072C9.9963 6.6021 10.6665 6.66811 11.2756 6.9204C11.8847 7.1727 12.4053 7.59994 12.7716 8.1481C13.1378 8.69627 13.3333 9.34073 13.3333 10C13.3333 10.8841 12.9821 11.7319 12.357 12.357C11.7319 12.9821 10.8841 13.3333 10 13.3333ZM10 8.33334C9.67036 8.33334 9.34813 8.43108 9.07405 8.61422C8.79997 8.79736 8.58635 9.05765 8.4602 9.3622C8.33405 9.66674 8.30105 10.0019 8.36536 10.3252C8.42967 10.6485 8.5884 10.9454 8.82149 11.1785C9.05458 11.4116 9.35155 11.5703 9.67485 11.6346C9.99815 11.699 10.3333 11.6659 10.6378 11.5398C10.9423 11.4137 11.2026 11.2 11.3858 10.926C11.5689 10.6519 11.6667 10.3296 11.6667 10C11.6667 9.55797 11.4911 9.13405 11.1785 8.82149C10.8659 8.50893 10.442 8.33334 10 8.33334ZM15 19.1667C15 17.8406 14.4732 16.5688 13.5355 15.6311C12.5979 14.6935 11.3261 14.1667 10 14.1667C8.67392 14.1667 7.40215 14.6935 6.46447 15.6311C5.52678 16.5688 5 17.8406 5 19.1667C5 19.3877 5.0878 19.5996 5.24408 19.7559C5.40036 19.9122 5.61232 20 5.83333 20C6.05435 20 6.26631 19.9122 6.42259 19.7559C6.57887 19.5996 6.66667 19.3877 6.66667 19.1667C6.66667 18.2826 7.01786 17.4348 7.64298 16.8096C8.2681 16.1845 9.11594 15.8333 10 15.8333C10.8841 15.8333 11.7319 16.1845 12.357 16.8096C12.9821 17.4348 13.3333 18.2826 13.3333 19.1667C13.3333 19.3877 13.4211 19.5996 13.5774 19.7559C13.7337 19.9122 13.9457 20 14.1667 20C14.3877 20 14.5996 19.9122 14.7559 19.7559C14.9122 19.5996 15 19.3877 15 19.1667ZM15 6.66667C14.3407 6.66667 13.6963 6.47117 13.1481 6.1049C12.5999 5.73863 12.1727 5.21803 11.9204 4.60895C11.6681 3.99986 11.6021 3.32964 11.7307 2.68303C11.8593 2.03643 12.1768 1.44249 12.643 0.976312C13.1092 0.510137 13.7031 0.192668 14.3497 0.0640506C14.9963 -0.0645668 15.6665 0.00144427 16.2756 0.253736C16.8847 0.506029 17.4053 0.93327 17.7716 1.48143C18.1378 2.0296 18.3333 2.67406 18.3333 3.33334C18.3333 4.21739 17.9821 5.06524 17.357 5.69036C16.7319 6.31548 15.8841 6.66667 15 6.66667ZM15 1.66667C14.6704 1.66667 14.3481 1.76442 14.074 1.94755C13.8 2.13069 13.5863 2.39099 13.4602 2.69553C13.3341 3.00007 13.301 3.33518 13.3654 3.65849C13.4297 3.98179 13.5884 4.27876 13.8215 4.51185C14.0546 4.74493 14.3515 4.90367 14.6748 4.96798C14.9982 5.03229 15.3333 4.99928 15.6378 4.87314C15.9423 4.74699 16.2026 4.53337 16.3858 4.25929C16.5689 3.9852 16.6667 3.66297 16.6667 3.33334C16.6667 2.89131 16.4911 2.46738 16.1785 2.15482C15.8659 1.84226 15.442 1.66667 15 1.66667ZM20 12.5C19.9987 11.1743 19.4715 9.90333 18.5341 8.96593C17.5967 8.02853 16.3257 7.50133 15 7.5C14.779 7.5 14.567 7.5878 14.4107 7.74408C14.2545 7.90036 14.1667 8.11232 14.1667 8.33334C14.1667 8.55435 14.2545 8.76631 14.4107 8.92259C14.567 9.07887 14.779 9.16667 15 9.16667C15.8841 9.16667 16.7319 9.51786 17.357 10.143C17.9821 10.7681 18.3333 11.6159 18.3333 12.5C18.3333 12.721 18.4211 12.933 18.5774 13.0893C18.7337 13.2455 18.9457 13.3333 19.1667 13.3333C19.3877 13.3333 19.5996 13.2455 19.7559 13.0893C19.9122 12.933 20 12.721 20 12.5ZM5 6.66667C4.34073 6.66667 3.69626 6.47117 3.1481 6.1049C2.59994 5.73863 2.17269 5.21803 1.9204 4.60895C1.66811 3.99986 1.6021 3.32964 1.73072 2.68303C1.85933 2.03643 2.1768 1.44249 2.64298 0.976312C3.10915 0.510137 3.7031 0.192668 4.3497 0.0640506C4.9963 -0.0645668 5.66652 0.00144427 6.27561 0.253736C6.8847 0.506029 7.40529 0.93327 7.77156 1.48143C8.13784 2.0296 8.33333 2.67406 8.33333 3.33334C8.33333 4.21739 7.98214 5.06524 7.35702 5.69036C6.7319 6.31548 5.88405 6.66667 5 6.66667ZM5 1.66667C4.67036 1.66667 4.34813 1.76442 4.07405 1.94755C3.79997 2.13069 3.58635 2.39099 3.4602 2.69553C3.33405 3.00007 3.30105 3.33518 3.36536 3.65849C3.42967 3.98179 3.5884 4.27876 3.82149 4.51185C4.05458 4.74493 4.35155 4.90367 4.67485 4.96798C4.99815 5.03229 5.33326 4.99928 5.63781 4.87314C5.94235 4.74699 6.20265 4.53337 6.38578 4.25929C6.56892 3.9852 6.66667 3.66297 6.66667 3.33334C6.66667 2.89131 6.49107 2.46738 6.17851 2.15482C5.86595 1.84226 5.44203 1.66667 5 1.66667ZM1.66667 12.5C1.66667 11.6159 2.01786 10.7681 2.64298 10.143C3.2681 9.51786 4.11594 9.16667 5 9.16667C5.22101 9.16667 5.43297 9.07887 5.58926 8.92259C5.74554 8.76631 5.83333 8.55435 5.83333 8.33334C5.83333 8.11232 5.74554 7.90036 5.58926 7.74408C5.43297 7.5878 5.22101 7.5 5 7.5C3.67432 7.50133 2.40332 8.02853 1.46593 8.96593C0.528533 9.90333 0.00132369 11.1743 0 12.5C0 12.721 0.0877974 12.933 0.244078 13.0893C0.400358 13.2455 0.61232 13.3333 0.833333 13.3333C1.05435 13.3333 1.26631 13.2455 1.42259 13.0893C1.57887 12.933 1.66667 12.721 1.66667 12.5Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_352_1680">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Сотрудники
            </li>
          </NavLink>
        </ul>
      </menu>
    </aside>
  );
};