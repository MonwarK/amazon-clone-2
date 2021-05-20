import Product from "./Product";

export default function ProductFeed({products}) {
    return (
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-40">
            {
                products.slice(0,4).map(({id, title, price, description, category, image}) =>
                    <Product
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                    />
                )
            }
            <img
                className="md:col-span-full mx-auto"
                src="https://links.papareact.com/dyz"
                alt=""            
            />
            <div className="md:col-span-2">
            {
                products.slice(4,5).map(({id, title, price, description, category, image}) =>
                    <Product
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                    />
                )
            }
            </div>
            <div className="md:col-span-2">
            {
                products.slice(5,6).map(({id, title, price, description, category, image}) =>
                    <Product
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                    />
                )
            }
            </div>
            {
                products.slice(6).map(({id, title, price, description, category, image}) =>
                    <Product
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                    />
                )
            }
            
        </div>
    )
}