import {render, screen} from "@testing-library/react";
import Search from "../Search";
import {store} from "../../store/store";
import {Provider} from "react-redux";
import { MemoryRouter, Route, useLocation } from 'react-router-dom';

test('should render SearchPage', async () => {
    render(
        <MemoryRouter>
            <Provider store={store}>
                <Search />
            </Provider>
        </MemoryRouter>
    );
});
