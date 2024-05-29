import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { DemoContract } from '../wrappers/DemoContract';
import '@ton/test-utils';

describe('DemoContract', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let demoContract: SandboxContract<DemoContract>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        demoContract = blockchain.openContract(await DemoContract.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await demoContract.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: demoContract.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and demoContract are ready to use
    });
});
