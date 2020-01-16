import { VariationModule } from './variation.module';

describe('VariationModule', () => {
    let variationModule: VariationModule;

    beforeEach(() => {
        variationModule = new VariationModule();
    });

    it('should create an instance', () => {
        expect(variationModule).toBeTruthy();
    });
});
