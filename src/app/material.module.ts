import {NgModule} from '@angular/core';

import {
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
    MatSidenavModule,
    MatIconModule,
    MatBadgeModule,
    MatChipsModule,
    MatDialogModule
} from '@angular/material';

@NgModule({
    imports: [
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTabsModule,
        MatSidenavModule,
        MatBadgeModule,
        MatChipsModule,
        MatDialogModule
    ],
    exports: [
        MatAutocompleteModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatSnackBarModule,
        MatTabsModule,
        MatSidenavModule,
        MatBadgeModule,
        MatChipsModule
    ]
})
export class MaterialModule {
}
