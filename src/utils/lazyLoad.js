import React, { Suspense } from 'react';

import Loader from '../components/Loader';

const lazyLoad = (Component) => {
    return (props) => <Suspense fallback={<Loader />}><Component {...props} /></Suspense>;
};

export default lazyLoad;
