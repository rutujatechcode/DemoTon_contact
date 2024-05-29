import { toNano } from '@ton/core';
import { DemoContract } from '../wrappers/DemoContract';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const demoContract = provider.open(await DemoContract.fromInit());

    await demoContract.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(demoContract.address);

    // run methods on `demoContract`
}
