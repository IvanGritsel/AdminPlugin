import template from './htemplate.html.twig';

const { Criteria } = Shopware.Data;

Shopware.Component.register('admin-plugin-page', {
    template: template,

    inject: ['repositoryFactory'],

    data() {
        return {
            entity: undefined,
            numberOfProducts: undefined,
            lastProdId: undefined,
            autoIncrement: undefined,
        }
    },

    computed: {
        productRepository() {
            return this.repositoryFactory.create('product');
        },
    },

    created() {
        this.countProductsAndGetLastId();
    },

    methods: {
        countProductsAndGetLastId() {
            const criteria = new Criteria(1, 1);

            criteria.addSorting(
                Criteria.sort('createdAt', 'DESC')
            );
            criteria.addAggregation(
                Criteria.count('count_id', 'id')
            );

            this.productRepository
                .search(criteria, Shopware.Context.api)
                .then(result => {
                    this.entity = result[0];
                    //console.log(result[0]);
                    this.lastProdId = result[0].id;
                    this.autoIncrement = result[0].autoIncrement;
                    this.numberOfProducts = result.aggregations.count_id.count;
                    // console.log('Last id: ' + this.lastProdId);
                    // console.log('Number: ' + this.numberOfProducts);
                });
        },

        newWithDefault() {
            let entity = this.productRepository.create(Shopware.Context.api);
            entity.name = 'Default Product Name';
            entity.description = 'Default Product Description';
            entity.price = [{
                currencyId: "b7d2554b0ce847cd82f3ac9bd1c0dfca",
                extensions: [],
                gross: 5,
                linked: true,
                listPrice: null,
                net: 4.2016806722689,
                percentage: null,
                regulationPrice: null
            }];
            entity.stock = 1;
            entity.tax = {
                apiAlias: null,
                createdAt: "2022-10-24T16:34:46.812+00:00",
                customFields: null,
                id: "b58e86a9be5c4c8a8f1effa7b02d8ff7",
                name: "Standard rate",
                position: 1,
                products: [],
                rules: [],
                shippingMethods: [],
                taxRate: 19,
                updatedAt: null,
            }
            entity.taxId = "b58e86a9be5c4c8a8f1effa7b02d8ff7";
            entity.productNumber = 'CSW1000' + this.autoIncrement;
            this.productRepository.save(entity, Shopware.Context.api);
            this.countProductsAndGetLastId();
        },

        updateLastWithDefault() {
            this.entity.name = 'Default Product Name';
            this.entity.description = 'Default Product Description';
            this.entity.price = [{
                currencyId: "b7d2554b0ce847cd82f3ac9bd1c0dfca",
                extensions: [],
                gross: 5,
                linked: true,
                listPrice: null,
                net: 4.2016806722689,
                percentage: null,
                regulationPrice: null
            }];
            this.productRepository.save(this.entity, Shopware.Context.api);
            this.countProductsAndGetLastId();
        },

        deleteLast() {
            this.productRepository.delete(this.lastProdId, Shopware.Context.api);
            this.countProductsAndGetLastId();
        },
    },

    metaInfo() {
        return {
            title: this.$createTitle(),
        };
    }
});