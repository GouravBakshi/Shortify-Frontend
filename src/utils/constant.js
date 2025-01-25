import AppRouter, { subDomainRouter } from "../AppRouter";

export const subDomainList = [
{subdomain: "www", app: AppRouter, main: true},
{subdomain: "url", app: subDomainRouter, main: false}
];