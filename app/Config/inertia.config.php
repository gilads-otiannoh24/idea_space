<?php

use NeoIsRecursive\Inertia\InertiaConfig;
use NeoIsRecursive\Inertia\ManifestVersionResolver;
use NeoIsRecursive\Inertia\Props\AlwaysProp;
use NeoIsRecursive\Inertia\Support\ResolveErrorProps;
use Tempest\Auth\Authentication\Authenticator;

return new InertiaConfig(
    /**
     * The view that inertia should render on the first request
     */
    rootView: 'app.view.php',
    /**
     * Version resolver, if you use vite for example you probably want to use the default here,
     * or you can add a custom one to maybe get from enviroment variables etc.
     *
     * default path: public/build/manifest.json
     */
    versionResolver: new ManifestVersionResolver(),
    /**
     * Props that should be included in "all" requests, the default is errors and the authenticated user
     */
    sharedProps: [
        'app' => new AlwaysProp(fn() => []),
        'errors' => new AlwaysProp(fn(ResolveErrorProps $errors) => $errors->resolve()),
    ]
);