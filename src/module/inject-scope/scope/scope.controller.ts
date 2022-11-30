import { Controller, Scope } from '@nestjs/common';

@Controller({
    path:'scope',
    scope:Scope.REQUEST
})
export class ScopeController {
    
}
